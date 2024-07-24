<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCollection;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  

    public function index()
    {
        $author = Post::select('author','slug_author')->distinct()->get();
        $post= Post::latest()->paginate(8);
        $post->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => $post->content,
                'category' => $post->category,
                'author' => $post->author,
                'slug_author' => $post->slug_author,
                'created_at' => $post->created_at->diffForHumans(),
            ];
        });
        
        $posts = new PostCollection($post);
        
        return Inertia::render('Index',['posts' => $posts,'author'=> $author]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function dashboard(Request $request)
    {
        $posts = Post::where('author',auth()->user()->name)->get();
        
        $posts->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'category' => $post->category,
                'author' => $post->author,
                'created_at' => $post->created_at->diffForHumans(),
            ];
        });
        $sortedPosts = $posts->sortByDesc('id')->values();
        return Inertia::render('Dashboard',['posts'=>$sortedPosts,'tab_token' => $request->get('tab_token')]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title'=> 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'author' => 'required|string'

        ]);
        
        if($validate){
            $post = new Post();
            $post->title = $request->title;
            $post->slug = Str::of($post->title)->slug('-');
            $post->content = $request->content;
            $post->category = $request->category;
            $post->author = $request->author;
            $post->slug_author = Str::of($post->author)->slug('-');
            $post->save();

        return redirect()->back()->with('message','success');
        }

        return redirect("/");

        
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $post = Post::where('slug',$slug)->get()->first();
        return Inertia::render('Detail',['post'=> $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $find = $post::findOrFail($post->id);
        return Inertia::render('Edit',['post' => $find]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title'=> 'required|string',
            'content' => 'required|string'
        ]);
        
        $find = $post::findOrFail($post->id);
        try{
            $post->where('id',$find->id)->update([
                'content' => $request->content
            ]);
            return redirect()->back()->with('message','success');
        } catch(Exception $e){
            return redirect()->back()->withErrors($e->getCode(),'error');
        }
       

    }


    public function listByAuthor($author){
        $posts = Post::where('slug_author',$author)->get();
        $author_unslug = Str::replace('-',' ',$author);
        $author_unslug = Str::title($author_unslug);
        $posts->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => $post->content,
                'category' => $post->category,
                'author' => $post->author,
                'slug_author' => $post->slug_author,
                'created_at' => $post->created_at->diffForHumans(),
            ];
        });
        return Inertia::render('List',['posts'=>$posts,'author'=> $author_unslug]);
    }


    public function category($request){
        $posts = Post::where('category',$request)->get();
        return Inertia::render('Category',['posts' => $posts,'category' => $request]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return redirect()->back()->with('message','success');
    }
}



