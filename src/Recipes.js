import React, {Component} from 'react';
import firebase from './Firebase.js';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      username: '',
      recipeDescription: '',
      avatar: '',
      avatarURL: '',
      items: [],
      isUploading: false,
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    //console.log(this.props.userID);
    e.preventDefault();
    const itemsRef = firebase.database().ref(`items/${this.props.userID}`);
    const item = {
      recipeName: this.state.recipeName,
      username: this.state.username,
      recipeDescription: this.state.recipeDescription,
      avatar: this.state.avatar,
      avatarURL: this.state.avatarURL
    }
    itemsRef.push(item);
    this.setState({
      recipeName: '',
      username: '',
      recipeDescription: '',
      avatar: '',
      avatarURL: ''
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref(`items/${this.props.userID}`);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          recipeName: items[item].recipeName,
          username: items[item].username,
          recipeDescription: items[item].recipeDescription,
          avatarURL: items[item].avatarURL});
      }
      this.setState({items: newState});
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${this.props.userID}/${itemId}`);
    itemRef.remove();
  }

  //upload image eventhandlers
  handleChangeUsername = event => this.setState({
    username: event.target.value});

  handleUploadStart = () => this.setState({
    isUploading: true,
    progress: 0});

  handleProgress = progress => this.setState({
    progress});

  handleUploadError = error => {
    this.setState({
      isUploading: false});
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref(`/${this.props.userID}/images`).child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };
  //end upload image eventhandlers

  render() {
    return (
      <div className='container-fluid'>
        <div className="row">

        <section className='add-item col-lg-4 recipes'>
          <form onSubmit={this.handleSubmit}>
            <label
              className="form-control-label"
              htmlFor="displayName">
            Recipe name
            </label>
            <input
              type="text"
              name="recipeName"
              placeholder="Recipe name"
              onChange={this.handleChange}
              value={this.state.recipeName}/>

          {/* upload image component */}
            <label>Enter image</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img className="image-uploaded" src={this.state.avatarURL}/>}
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename="randomizeFilename"
              storageRef={firebase.storage().ref(`/${this.props.userID}/images`)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}/>
            {/* end upload image component */}

            <label>Enter description</label>
            <textarea
              rows="4"
              cols="50"
              name="recipeDescription"
              placeholder="Enter description"
              onChange={this.handleChange}
              value={this.state.recipeDescription}/>
            <button className="btn__app">
              Add recipe
            </button>
          </form>
        </section>

        <section className='display-item col-lg-8'>
          <div className="wrapper">
            <div className="row">
              {
                this.state.items.map((item) => {
                  return (
                    <div className="recipe-box-wp col-md-6 col-xl-4" key={item.id}>
                      <article className="recipe-box">
                        <h3>
                          {item.recipeName}
                        </h3>
                        <img
                          src={item.avatarURL}
                          alt=""/>
                        <div
                          className="recipeDescription" href="{item.recipeDescription}">
                          {item.recipeDescription}
                        </div>
                        <button className="btn__app" onClick={() => this.removeItem(item.id)}>
                          Remove recipe
                        </button>
                      </article>
                    </div>
                )
                })
              }
            </div>
          </div>
        </section>
      </div>
      </div>
    );
  }
}
export default Recipes;
