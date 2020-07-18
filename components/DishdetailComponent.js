import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Card, Icon,Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
  }


function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
                <Card title={dish.name}> 
                    <Image source={{uri: baseUrl + dish.image}}/>
                    <Text>{dish.description}</Text>
                    <Icon 
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}/>
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
           
            favorites:[],

        }
    }
   
    markFavourite(dishId){
        this.setState({favorites:this.state.favorites.concat(dishId)})
    
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
        dish={this.props.dishes.dishes[dishId]}
        favorite={this.state.favorites.some(el=>el===this.props.route.params.dishId)}
         onPress={()=>this.markFavourite(dishId)}   />
        <RenderComments 
        comments={this.props.comments.comments.filter((comment) => comment.dishId === this.props.route.params.dishId)} />
    </View>);
    }
}

export default connect(mapStateToProps)(Dishdetail);