import React, { Component } from 'react';
import { Text, View, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon,Image } from 'react-native-elements';
import { Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

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

class RenderDish extends Component {
   
    handleRef = ref => this.view = ref

    render () {
        const {dish, favorite, onPress, toggleModal} = this.props

        const recognizeDrag = ({ dx }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }
        const recognizeComment = ({ dx }) => {
            if ( dx > 200 )
                return true;
            else
                return false;
        }
        
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            }, 
            onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                if(recognizeDrag(gestureState)) {
                    Alert.alert(
                        'Add Favorite',
                        ' sure you wish to add ' + dish.name + ' to favorite?',
                        [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {favorite ? console.log('Already favorite') : onPress()}},
                        ],
                        { cancelable: false }
                    );
                    return true
                }
                if(recognizeComment(gestureState)) {
                    toggleModal;
                    
                    return true
                }
                else return true;
                
            }
        })
        if (dish != null) {
            return (
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers} ref={this.handleRef}
                >
                    <Card 
                        featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}
                    >
                        <Text style={{margin:10}}>{dish.description}</Text>
                        <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Icon raised reverse name={ favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={() => favorite ? console.log('Already favorite') : onPress()}
                        />
                        <Icon raised reverse name={'pencil'} type='font-awesome' color='#512DA8' onPress={toggleModal}/>
                        </View>
                    </Card>
                </Animatable.View>
            )
                        
        }
        else return (
            <View />
        )
    }
    
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment} {item.dishId} , {props.route}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
            </Animatable.View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
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
        
        this.toggleModal = this.toggleModal.bind(this)
        //this.handleComment = this.handleComment.bind(this)
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