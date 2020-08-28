import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, Modal, StyleSheet, Button} from 'react-native';
import {Card, Icon, Input} from 'react-native-elements';
import {baseUrl} from "../shared/baseUrl";
import {connect} from "react-redux";
import {postComment, postFavorite} from "../redux/ActionCreators";
import {Rating} from "react-native-ratings";

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites,
	}
}
const mapDispatchToProps = dispatch => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {
	const dish = props.dish;

	if (dish) {
		return (
				<Card
						featuredTitle={dish.name}
						image={{uri: baseUrl + dish.image}}>
					<Text style={{margin: 10}}>
						{dish.description}
					</Text>
					<View style={styles.formRow}>
						<Icon
								raised reverse name={props.favorite ? "heart" : "heart-o"} type={"font-awesome"} color={"#f50"}
								onPress={() => props.favorite ? console.log("already favorite") : props.onPress()}/>
						<Icon
								raised reverse name={"pencil"} type={"font-awesome"} color={"#512DA8"}
								onPress={() => props.showModal()}/>

					</View>
				</Card>
		);
	} else {
		return (<View/>);
	}
}

function RenderComments(props) {
	const comments = props.comments;
	const renderCommentItem = ({item, index}) => {
		return (
				<View key={index} style={{margin: 10}}>
					<Text style={{fontSize: 14}}>{item.comment}</Text>
					<Text style={{fontSize: 12}}>{item.rating} Stars</Text>
					<Text style={{fontSize: 12}}> {"-- " + item.author + ", " + item.date}</Text>
				</View>
		)
	}
	return (
			<Card title={"Comments"}>
				<FlatList data={comments} renderItem={renderCommentItem}
				          keyExtractor={item => item.id.toString()}/>
			</Card>
	);
}

class Dishdetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			author: "",
			comment: "",
			showModal: false
		}
	}

	markFavorite(dishId) {
		this.props.postFavorite(dishId);
	}

	static navigationOptions = {
		title: "Dish Details"
	}

	toggleModal() {
		this.setState({showModal: !this.state.showModal});
	}

	handleCommentSubmit() {
		this.props.postComment({
			author: this.state.author,
			comment: this.state.comment,
			dishId: this.props.navigation.getParam("dishId", ""),
			rating: this.state.rating
		});
	}

	resetForm() {
		this.setState({
			rating: 0,
			author: "",
			comment: '',
		});
	}

	render() {
		const dishId = this.props.navigation.getParam('dishId', '');
		return (
				<ScrollView>
					<RenderDish
							dish={this.props.dishes.dishes[+dishId]}
							favorite={this.props.favorites.some(elem => elem === dishId)}
							onPress={() => this.markFavorite(dishId)}
							showModal={() => {
								this.setState({showModal: true})
							}}
					/>
					<RenderComments
							comments={this.props.comments.comments.filter(
									comment => comment.dishId === dishId
							)}
					/>
					<Modal animationType={"slide"} transparent={false} visible={this.state.showModal}
							// onDismiss={() => this.toggleModal()}
							// onRequestClose={() => this.toggleModal()}
					>
						<View style={styles.modal}>
							<Rating showRating onFinishRating={(rating) => this.setState({rating: rating})}/>
							<View>
								<Icon name={"user"} type={"font-awesome"} color={"gray"}/>
								<Input placeholder={"Author"} onChangeText={(author) => this.setState({author: author})}/>
							</View>
							<View>
								<Icon name={"comment"} type={"font-awesome"} color={"gray"}/>
								<Input placeholder={"Comment"} onChangeText={(comment) => this.setState({comment: comment})}/>
							</View>
							<Button title={"SUBMIT"} onPress={() => {
								this.handleCommentSubmit()
							}} color={"#512DA8"}/>
							<View style={styles.formRow}>
								<Button title={"CANCEL"} onPress={() => {
									this.resetForm()
								}} color={"gray"}/>
							</View>
						</View>

					</Modal>
				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	formLabel: {
		fontSize: 18,
		flex: 2
	},
	formItem: {
		flex: 1
	},
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20
	},
	modalText: {
		fontSize: 18,
		margin: 10
	},
})
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);