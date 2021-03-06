import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';

const TriveDapp = contract(VotingContract);
TriveDapp.setProvider(web3.currentProvider);

class ResearcherArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: ""
      },
      taskInfo: {
        ipfsHash: "",
        reward: ""
      }
    }
    this.fetchIPFS = this.fetchIPFS.bind(this);
    this.getTaskInfo = this.getTaskInfo.bind(this);
  }
  fetchIPFS() {
    fetch(`https://gateway.ipfs.io/ipfs/${this.state.taskInfo.ipfsHash}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
        this.setState({
          myData: {
            desc: data.myData.description,
            title: data.myData.title,
            url: data.myData.url
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };

  getTaskInfo() {
    console.log(this.props.articleId)
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance._getTaskInfo(this.props.articleId)
    }).then((result) => {
      console.log(result)
      this.setState({
        taskInfo: {
          ipfsHash: result[0],
          reward: result[2].c[0]
        }
      })
      this.fetchIPFS();
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.getTaskInfo();

  }
  render() {
    const { data } = this.props;
    // const checkResearcher = checkIfUserIsResearcher()
    // const researchButton = (<Button bsStyle="primary">Reseach this article</Button>);

    return (
      <div>
        <Jumbotron>
          <h1>{this.state.myData.title}</h1>
          <p><small>Reward: {this.state.taskInfo.reward}TRV</small></p>
          <p>
            Description of the problem: <br />
            {this.state.myData.desc}
          </p>
          <p>Source: <br /> {this.props.researcherData.source}</p>
          <p>Comments: <br /> {this.props.researcherData.comments}</p>
          <p>Score: <br /> {this.props.researcherData.score}%</p>
        </Jumbotron>
      </div>
    );
  }
}
export default ResearcherArticleInfo;
