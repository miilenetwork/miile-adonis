'use strict'
const Database = use('Database')
const Post = use('App/Models/Post')
class PostController {

  async index ({ request, response, view }) {
    const posts = await Post.all()
    return view.render('post.index',{posts: posts.toJSON()})
  }

  async create ({ request, response, view }) {
    return view.render('post.create')
  }

  async store ({ request, response }) {
    const NewPost = request.only(['title','content'])
    // const PostId = await Database.insert(NewPost).into('posts')
    const Redirect = await Post.create(NewPost)
    return response.redirect(`/post/${ Redirect.id }`)
  }

  async show ({ params, request, response, view }) {
    // const ShowPost = await Database
    //  .from('posts')
    //  .where('id', params.id)
    //  .first()
    const ShowPost = await Post.find(params.id)
     return view.render('post.show',{ ShowPost })
  }

  async edit ({ params, request, response, view }) {
    // const EditPost = await Database
    // .from('posts')
    // .where('id',params.id)
    // .first()
    const EditPost = await Post.findOrFail(params.id)
    return view.render('post.edit',{ EditPost })
  }

  async update ({ params, request, response }) {
    const UpdatePost = request.only(['title','content'])
    // await Database
    // .table('posts')
    // .where('id',params.id)
    // .update(UpdatePost)
    const post = await Post.findOrFail(params.id)
    post.merge(UpdatePost)
    post.save()
  }

  async destroy ({ params, request, response }) {
    // await Database
    // .table('posts')
    // .where('id',params.id)
    // .delete()
    const post = await Post.find(params.id)
    post.delete()
     return 'success'
  }
}

module.exports = PostController
