import React, { Component } from 'react'
import moment from 'moment';
import './App.css';

import Logo from './icon-search.svg';
import Company from './company.svg';
import Location from './location.svg';
import Twitter from './twitter.svg';
import Website from './website.svg';
import PropTypes from 'prop-types'


export default class test extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state = {
        items: [],
        SearchData: '',
        DataisLoaded: false,
        message: "",

    }

    search = async (event) => {
        console.log(event.target.value);
        await this.setState({
            SearchData: event.target.value,
            message: "",
            DataisLoaded: false
        })
        console.log(this.state.SearchData)
    }


    setData = (e) => {
        e.preventDefault();


        fetch(`https://api.github.com/users/${this.state.SearchData}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.message !== "Not Found") {
                    console.log(json)
                    this.setState({
                        items: json,
                        DataisLoaded: true
                    });
                }
                else {
                    this.setState({ message: "No User Found..." })
                }


            })
    }



    render() {
        return (
            <div className="main-page">
                <h1>devfinder</h1>
                <form onSubmit={this.setData}>
                    <img className="search" onClick={this.setData} alt="search-logo" src={Logo}></img>
                    <input type="search" placeholder="Enter Git UserName Here" onChange={this.search}></input>
                    <span><button onClick={this.setData}> Search </button></span>
                </form>


                <div className={this.state.DataisLoaded && this.state.message.length == 0 ? ("main-conatainer") : ("main-conatainer-b")}>
                    <div className="first">
                        <img className="avatar" src={this.state.items.avatar_url} alt="avatar" />
                    </div>
                    <div className="second two">
                        <div>
                            <span><h3> {this.state.items.name}</h3></span>
                            <p className="idn"> @{this.state.items.login}</p>
                        </div>
                        <div> <span><p>  joined {moment(this.state.items.created_at).format('DD MMM yyyy')}</p></span></div>
                    </div>
                    <div className="third">
                        <p>{this.state.items.bio === null ? "This profile has no bio" : this.state.items.bio}</p>
                    </div>
                    <div className="fourth ">
                        <div className="followers four">
                            <div className="four1">
                                <span><p>Repo  <br /> {this.state.items.public_repos}</p></span>
                            </div>
                            <div className="four2">
                                <span><p>Followers  <br /> {this.state.items.followers}</p></span>
                            </div>
                            <div className="four3">
                                <span><p>Following  <br /> {this.state.items.following}</p></span>
                            </div>
                        </div>
                    </div>
                    <div className="fifth ">
                        <div className="last-img"><div><img alt="images-last" src={Location} /> </div><div className="nav-L">  {this.state.items.location === null ? "Not Available " : this.state.items.location}</div></div>
                        <div className="last-img"><div><img alt="images-last" src={Twitter} /> </div><div className="nav-L">  {this.state.items.twitter_username === null ? "Not Available " : this.state.items.twitter_username}</div></div>
                        <div className="last-img"><div><img alt="images-last" src={Website} /></div><div className="nav-L">  {this.state.items.blog==="" ? "Not Available " : this.state.items.blog}</div></div>
                        <div className="last-img"><div><img alt="images-last" src={Company} /> </div><div className="nav-L">  {this.state.items.company === null ? "Not Available " : this.state.items.company}</div></div>
                    </div>
                </div>
                <div className="error-msg">{this.state.message}</div>
                {console.log(this.state.items.blog)}
            </div>

        )
    }
}