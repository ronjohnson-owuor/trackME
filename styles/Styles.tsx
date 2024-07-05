import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'flex-start',
      
    },  
    LivePosUpdate: {
      height:40,
      width:'100%',
      fontWeight:'bold',
      justifyContent:'center',
      gap: 20,
      alignItems:'center',
      flexDirection:'row'
    },

    LivePosUpdateText: {
      fontWeight:'bold',
      color:'gray'
    },


    bodyView: {
        height:500,
        margin:20,
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#FF6347',
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      heading_nav: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
      },

    heading: {
        fontSize:40,
        fontWeight:'bold',
        marginBottom:40,
        width:'90%',
    },

    explainer: {
        width:'90%',
        color:'gray',
        marginBottom:40
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        elevation: 3,
        width:'40%',
        alignItems:'center',
        justifyContent:'center'
      },
      buttonText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        padding:2
      },
      TextInput: {
        padding:5,
        marginBottom:10,
        width:"90%",
        height:40,
        borderRadius:5,
        backgroundColor:'#ffe'
      },
      startbutton: {
        backgroundColor: '#FF6347',
        height:40,
        borderRadius: 6,
        elevation: 3,
        width:'90%',
        alignItems:'center',
        justifyContent:'center'
      },
      maps: {
        width:'100%',
        height:'100%'
      }
  });

  export default styles;