import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonGroup, DropdownButton, MenuItem} from "react-bootstrap";
import SubmitResearch from "./D-Components/SubmitArticle";
import News from "./D-Components/VerifiedNews";
import ResearcherForm from "./D-Components/ResearcherForm";
import OpenNews from "./D-Components/OpenNews";
import VerifyNews from "./D-Components/VerifyNews"


class Dashboard extends Component {


  render() {

    return (
      <div>
      <div className="dashboard-div">
        <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" className="App-logo-d" alt="logo" />
      </div>
      <div>
        <Grid className="dash-row">

          <Row className="show-grid">

            <Col sm={2}>
              <ButtonGroup vertical block >
                <Button><Link to="/dashboard/news" >Verified News</Link></Button>
                <Button><Link to="/dashboard/submitresearch" >Submit Article</Link></Button>
                <Button><Link to="/dashboard/researcher">Researcher Portal</Link></Button>
                <DropdownButton title="News Status" id="bg-vertical-dropdown-1">
                  <MenuItem eventKey="1"><Button style={{width: '100%'}}><Link to="/dashboard/opennews" >Open</Link></Button></MenuItem>
                  <MenuItem eventKey="2"><Button style={{width: '100%'}}><Link to="/dashboard/verify" >Verify</Link></Button></MenuItem>
                  {/* <MenuItem eventKey="3"><Link to="" >Witness</Link></MenuItem>
                  <MenuItem eventKey="4"><Link to="" >Expired</Link></MenuItem>
                  <MenuItem eventKey="5"><Link to="" >Cancelled</Link></MenuItem> */}
                </DropdownButton>

              </ButtonGroup>
            </Col>

            <Col sm={10}  className="dash-content">

              <Switch>
                <Route exact path="/dashboard/researcher" render={(props) => (<ResearcherForm
                  curAddr={this.props.curAddr}
                  myContract={this.props.myContract}
                 />)} />
                <Route exact path="/dashboard/submitresearch" render={(props) => (<SubmitResearch
                  myContract={this.props.myContract}
                 />)} />

                <Route exact path="/dashboard/news" render={(props) => (<News
                  myContract={this.props.myContract}
                  curAddr={this.props.curAddr}
                />)} />

                <Route exact path="/dashboard/opennews" render={(props) => (<OpenNews
                  myContract={this.props.myContract}
                  curAddr={this.props.curAddr}
                />)} />

                <Route exact path="/dashboard/verify" render={(props) => (<VerifyNews
                  myContract={this.props.myContract}
                  curAddr={this.props.curAddr}
                />)} />

                <Route exact path="/dashboard/" render={(props) => (<News
                  myContract={this.props.myContract}
                />)} />

              </Switch>
            </Col>

          </Row>

        </Grid>
      </div>
      </div>
    )
  }
}

export default Dashboard;
