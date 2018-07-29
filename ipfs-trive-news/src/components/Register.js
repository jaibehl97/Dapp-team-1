import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Grid, Row, Col, Button, Form, FormGroup, ControlLabel, Checkbox, FormControl} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../web3';
import ShowArticleInfo from "./showComponents/showArticleInfo";
// import VotingContract from '../../build/contracts/Voting.json';
//
// const TriveDapp = contract(VotingContract);
// TriveDapp.setProvider(web3.currentProvider);
// TODO: testing if I can give these vars as props
// TODO: button will call function on contract artifacts
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      articleIds: [],
      articles: []
    };
    this.getTaskByOwner = this.getTaskByOwner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTaskInfo = this.getTaskInfo.bind(this);
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;
    // TODO: I should move getAccounts out of this function
    web3.eth.getAccounts((error, accounts) => {
      var account = accounts[0];
      TriveDapp.deployed().then((instance) => {
        TriveDappInstance = instance;
        return TriveDappInstance.createUser(this.state.username, {from: account, gas: 6654755})
      }).then((result) => {
        console.log(result);
        // TODO: I need to route from here
        // return TriveDappInstance.findUserInfo.call(account)
      }).then((result) => {
        // return this.setState({ username: result.c[0] })
      })
    })
  }
  findArticleInfo(arr) {
    console.log(arr);
    let res = [];
    arr.map(num => {
      res.push(parseInt(num.toString()))
    });
    console.log(res);
    this.setState({
      articleIds: res
    });

    res.forEach((num) => {
      this.getTaskInfo(num);
    });
  }

  getTaskInfo(articleId) {
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance._getTaskInfo(articleId)
    }).then((result) => {
      console.log(result)
      var articles = [...this.state.articles];
      articles.push(<ShowArticleInfo key={result[0]} data={result}/>);

      this.setState({
        articles
      });
    }).catch((error) => {
      console.log(error)
    })
  }

  getTaskByOwner() {
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;

    web3.eth.getAccounts((error, accounts) => {
      var account = accounts[0];
      TriveDapp.deployed().then((instance) => {
        TriveDappInstance = instance;
        return TriveDappInstance._getTasksByOwner(accounts[0])
      }).then((result) => {
        this.findArticleInfo(result);
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  componentDidMount() {
    this.getTaskByOwner()
  }

  render () {
    const gridHeight = {
      height: "100vh"
    };
  
    const { isUser, name, address, reputation, articleCount, penaltyCount, readyTime} = this.props.curUserInfo;
    const { username, articles, articleIds } = this.state;

    const registerForm = (
      <Form inline>
        <FormGroup controlId="formInlineName">
        {' '}
        <br/>
        <h1 className="text-center">Welcome to trive.news</h1>
        <h3 className="text-center">Current ethereum addres: {this.props.noUserAddr}</h3>
        <h3 className="text-center">Please enter a username to get started</h3>
        <br/>
        <FormControl
          type="text"
          value={username}
          placeholder="Enter text"
          onChange={this.handleChange}
        />
        </FormGroup>{' '} {' '}
        <Button onClick={this.handleSubmit}>Register</Button>
      </Form>
    );

    const userInfo = (
      <div>
        <h1>{name}' info</h1>
        <hr />
        <h3>Name of user: {name}</h3>
        <h3>address: {address}</h3>
        <h3>reputation: {reputation}</h3>
        <h3>article count: {articleCount}</h3>
        <h3>penalty count: {penaltyCount}</h3>
        <h3>ready time: {readyTime}</h3>
        <hr />
      </div>
    );

    return (
      <div>
        <div className="dashboard-div">
          <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" className="App-logo-d" alt="logo" />
        </div>
        <div>
          <Grid style={gridHeight}>
          <Row className="show-grid">
          <Col md={2}>
          </Col>
          <Col md={8} className="text-center">
            {!isUser && registerForm}
            {isUser && userInfo}
            {articles}
          </Col>
          <Col md={2}>
            </Col>
          </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
export default Register;