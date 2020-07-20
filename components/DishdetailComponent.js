import React, { Component } from 'react';
import { Text, View, FlatList,Modal,Button,StyleSheet } from 'react-native';
import { Card, Icon,Image } from 'react-native-elements';
import { Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    addComment:(dishId, author,rating, comment) =>dispatch(addComment(dishId, author,rating, comment)),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId, author, rating, comment)=>dispatch(postComment(dishId,author,rating,comment))
})

function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
                <Card title={dish.name}> 
                    <Image source={{uri: baseUrl + dish.image}}/>
                    <Text>{dish.description}</Text>
                    <View  style={{
                        paddingVertical: 15,
                        marginLeft:50,
                        flexDirection: "row",
                        alignItems: "center"
            }}>
                    <Icon 
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}/>
                    <Icon    
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={()=>props.onSelect()}
                        />
                        </View>
                    </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                 
                <Text style={{fontSize: 14}}>{item.comment} {item.dishId} , {props.route}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



class  Dishdetail extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            author:'',
            rating:1,
            comment:''
        }
    }
    toggleModal(){
        this.setState({isOpen:!this.state.isOpen})
    
    }
    handleComment(dishId){
        console.log(dishId+' '+JSON.stringify(this.state.author)+' '+this.state.rating+this.state.comment);
        this.toggleModal();
        this.props.postComment(dishId,this.state.author,this.state.rating,this.state.comment);
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions=({ route }) =>{
        return{
            title: route.params.dishId
        }
    }
    render(){
    
    const dishId=(this.props.route.params.dishId)
    return(
    <View>
         <RenderDish 
            onSelect={()=>this.toggleModal()}
            favorite={this.props.favorites.some(el => el === dishId)}
            dish={this.props.dishes.dishes[dishId]}
            onPress={()=>this.markFavorite(dishId)}   />
        <Modal 
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isOpen}
            onRequestClose={() => {
              this.toggleModal();
            }}
             onDismiss = {() => this.toggleModal() }
            >

                <Rating
                ratingCount={5}
                imageSize={30}
                showRating
                onFinishRating={(rating)=>{this.setState({rating:rating})}}
                />

                <Input
                    placeholder=' Author'
                    leftIcon={{ type: 'font-awesome',
                    name: 'user-o' }}
                    onChangeText={(author) => {this.setState({author:author})}}>
                </Input>
                    <Input
                    placeholder=' Comment'
                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                    onChangeText={(comment) => {this.setState({comment:comment})}}>
                </Input>
                <Button
                onPress={(dishId) => this.handleComment(dishId)}
                title="SUBMIT"
                color="#512DA8"
                                /> 
                <Button
                onPress={() => this.toggleModal()}
                title="CANCEL"
                color="#989898"
                />
        </Modal>
        <RenderComments 
        comments={this.props.comments.comments.filter((comment) => comment.dishId === this.props.route.params.dishId)} />
    </View>);
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
     }
     
});


export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);