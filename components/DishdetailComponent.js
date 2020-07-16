import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';

import { Card, Icon } from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';


function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
                <Card title={dish.name}> 
                    <Image source={require('./images/uthappizza.png')}/>
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
            dishes:DISHES,
            comments: COMMENTS,
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
    //const str=JSON.stringify({dishId})
    console.log(dishId)
    return(
    <View>
         <RenderDish 
        dish={this.state.dishes[dishId]}
        favorite={this.state.favorites.some(el=>el===this.props.route.params.dishId)}
         onPress={()=>this.markFavourite(this.props.route.params.dishId)}   />
        <RenderComments 
        comments={this.state.comments.filter((comment) => comment.dishId === this.props.route.params.dishId)} />
    </View>);
    }
}

export default Dishdetail;