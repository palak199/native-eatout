import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';

import { Card, Icon } from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';


function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                        <Icon 
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}/>
                    </Text>
                  
               
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
                <Text style={{fontSize: 14}}>{item.comment}</Text>
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
            favorites:[]
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
    //const dishId=this.props.route.params.dishId
    const {route}=this.props
    /* 2. Get the param */
    const {dishId} = route.params;
    const str=JSON.stringify({dishId})
    
    return(
    <ScrollView>
         <RenderDish dish={this.state.dishes[+dishId]}
        favorite={this.state.favorites.some(el=>el===dishId)}
         onPress={()=>this.markFavourite(dishId)}   />
        <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
    </ScrollView>);
    }
}

export default Dishdetail;