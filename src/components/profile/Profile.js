import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../../actions';
import './profile.css';

class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    renderList = () => {
        console.log(this.props);

        return this.props.profile.length != 0 && this.props.profile.workExperience.map((item, index, arr) => {
            const endMonthString = item.isCurrentJob ? "Present" :`${item.endMonth} ${item.endYear}`;

            return (
                <div key={index}>
                    <div className="job-item">
                        <div className="company-logo">
                            <img className="" src={item.companyLogo} height="40" width="40" />
                        </div>
                        <div>
                            <h3>{item.jobTitle}</h3>
                            <h4>{item.company}</h4>
                            <h5>{`${item.startMonth} ${item.startYear} - ${endMonthString}`}</h5>
                            <p>{item.jobDescription}</p>
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
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="#" className="header item">Test 1</a>
                        <a href="#" className="item">Test 2</a>
                        <a href="#" className="item">Test 3</a>
                    </div>
                </div>
                <div className="ui main text container add-margin">
                    <h1 className="ui header"></h1>
                    <div className="ui segment gradient">
                        <div className="flex-row">
                            <img className="ui tiny circular image profile-pic " src={profile.profileImage} />
                            <div className="text-segment">
                                <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
                                <h2 className="age">{profile.age}</h2>
                            </div>
                        </div>    
                    </div>
                    <div className="ui segment">
                        <h2 className="add-margin">Work Experience</h2>
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
