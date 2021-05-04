import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProfile } from '../../actions';
import './profile.css';

class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    renderList = () => {
        return this.props.profile.length !== 0 && this.props.profile.workExperience.map((item, index, arr) => {
            const endMonthString = item.isCurrentJob ? "Present" :`${item.endMonth} ${item.endYear}`;

            return (
                <div key={index}>
                    <div className="job-item">
                        <div className="company-logo">
                            <img className="" src={item.companyLogo} height="40" width="40" alt="company logo"/>
                        </div>
                        <div>
                            <h3 className="job-title">{item.jobTitle}</h3>
                            <h4>{item.company}</h4>
                            <h5>{`${item.startMonth} ${item.startYear} - ${endMonthString}`}</h5>
                            <p className="job-description">{item.jobDescription}</p>
                        </div>
                    </div>
                    {arr.length - 1 === index ? null : <div className="ui divider divide"></div>}
                </div>
            )
        })
    }
    render() {
        const { profile } = this.props;

        return (
            <div>
                <div className="ui pointing menu">
                    <div className="ui container">
                        <a href="#" className="header item">Test 1</a>
                        <a href="#" className="item">Test 2</a>
                        <a href="#" className="item">Test 3</a>
                    </div>
                </div>
                <div className="ui main text container add-margin">
                    <div className="first-segment ui segment">
                        <div className="flex-row">
                            <img className="ui tiny circular image profile-pic " src={profile.profileImage} alt="profile" />
                            <div className="text-segment">
                                <h1>{`${profile.firstName} ${profile.lastName}, ${profile.age}`}</h1>
                            </div>
                            <Link to="/basic_edit" className="basic-logo">
                                <i className="edit icon add-icon"></i>
                            </Link>
                        </div>    
                    </div>
                    <div className="ui segment">
                        <header className="experience-container">
                            <h2 className="experience-title">Work Experience</h2>
                            <Link to="/experience_add" className="plus-logo">
                                <i className="plus icon add-icon" />
                            </Link>
                        </header>  
                        <div className="experience-list">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return { profile: state.profile };
}

export default connect(mapStateToProps, { fetchProfile })(Profile);
