import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount = () => {
    this.getBlogPost(); 
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data })
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retreived data!!')
      });
  }


  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server!');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      })

  };

  resetUserInputs = () => {
    this.setState({
        title: '',
        body: ''
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

  };

  render() {

    console.log('State', this.state);

    return (
      <div className="blog-app">
        <h2>Welcome to my Recipe App</h2>
        <form onSubmit={this.submit} className="blog-form">
          <div className="blog-form-input">
            <input 
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="blog-form-input">
            <textarea 
              placeholder="Body" 
              name="body" 
              cols="30" 
              rows="10" 
              value={this.state.body} 
              onChange={this.handleChange}>
            </textarea>
          </div>
          <button className="blog-button">Submit</button>
        </form>
        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;