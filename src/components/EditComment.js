import React, {Component} from "react";
import {connect} from "react-redux";
import {editCommentToServerThunk} from "../actions";

class EditComment extends Component{

    constructor(props){
        super(props);
        this.state.body = props.comment.body;
    }
    state = {
        body: ""
    };

    handleSubmit = (e, id) => {
        e.preventDefault();

        const timestamp = Date.now();
        this.props.boundEditComment(id, timestamp, this.state.body);
        this.props.boundEditComponent({"id": id, "isOpen": false}); //close Edit when finished
    };

    handleChange = (e) => {
        this.setState({
            body: e.target.value
        })
    };

    render(){
        const {comment} = this.props;
        return(
            <div>
            <form onSubmit={(event) => this.handleSubmit(event, comment.id)}>
                <h1>Edit Comment</h1>
                <input type="text" className="comment-body"
                       value={this.state.body}
                       onChange={(event) => this.handleChange(event)}/>
                <input type="text" defaultValue={comment.author}/>
                <button type="submit">Submit</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state, myProps) => {
    return {
        comment: myProps.comment
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundEditComment: (id, timestamp, body) => dispatch(editCommentToServerThunk(id, timestamp, body)),
});

export default connect(mapStateToProps, mapDispatchToProps) (EditComment)