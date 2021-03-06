import React, {Component} from "react";
import "../App.css";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";
import {connect} from "react-redux";
import {
    deleteCommentFromServerThunk,
    editComponent,
    voteCommentToServerThunk
} from "../actions";
import {COMMENT, UP_VOTE, DOWN_VOTE} from "../reducers";


class CommentBar extends Component{
    constructor(props){
        super(props);

    }

    openEdit = (id) => {
        this.props.boundEditComponent({"id": id, "isOpen": true});
    };

    componentWillReceiveProps(props){
    }

    render(){
        const {commentId, author, voteScore} = this.props;
        const {boundVoteComment, boundDeleteComment} = this.props;
        return(
            <div>
                  <table>
                        <tbody>
                        <tr>
                            <td className="Table-data">
                                Author:{author}
                            </td>
                            <td className="Table-data">
                                Current Score:{voteScore}
                            </td>
                            <td className="Table-data">
                                <button onClick={() =>
                                    boundVoteComment(commentId, UP_VOTE)}><ThumbsUp/></button>
                            </td>
                            <td className="Table-data">
                                <button onClick={() =>
                                    boundVoteComment(commentId, DOWN_VOTE)}><ThumbsDown/></button>
                            </td>
                            <td className="Table-data">
                                <button onClick={() => this.openEdit(commentId)}><EditIcon/></button>
                            </td>
                            <td className="Table-data">
                                <button onClick={() => boundDeleteComment(commentId)}>
                                    <CloseIcon/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.commentId;
    return {
        comment: state[COMMENT].filter(comment => comment.id === commentId)[0],
        categoryName: ownProps.categoryName
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundDeleteComment: (id) => dispatch(deleteCommentFromServerThunk(id)),
    boundDeleteCommentFromState: "",
    boundVoteComment: (id, vote) => dispatch(voteCommentToServerThunk(id, vote)),
    boundEditComponent: (option) => dispatch(editComponent(option))
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);