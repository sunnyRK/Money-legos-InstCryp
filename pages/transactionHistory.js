import React, { Component } from 'react';
import { Grid, Segment, Card, Message, Container} from 'semantic-ui-react';
import Layout from '../components/Layout';
import Axios from 'axios';

class TransactionHistory extends Component {

    state = {
        items: [],
        waitMessage: "Please wait..."
    }

    async componentDidMount(){  
        Axios.get('http://localhost:4000/api/get')
        .then(res => {
            if(res.statusText == "OK") {
  
              var items = [];
              if(res.data.length > 0) {
                  for(var j=0;j<res.data.length;j++) {
                      const TransactionDetails = res.data[j];
                    //   console.log(TransactionDetails);
                      var hashLink = "https://kovan.etherscan.io/tx/"+TransactionDetails.transactionHash;
                      items[j] =  {
                        //   header: (<a href={hashLink}>Transaction Hash: {TransactionDetails.transactionHash}</a>),
                        //   meta: TransactionDetails.token0 +"/"+TransactionDetails.token1 +" Pair Address: " + TransactionDetails.pairAddress,
                        //   description: 'AmountIn(' + TransactionDetails.amountIN +") : AmountOut(" + TransactionDetails.amountOut+")",                
                        //   fluid: true,
                        //   style: { overflowWrap: 'break-word' }

                          header: (<a href={hashLink}>Transaction Hash: {TransactionDetails.transactionHash}</a>),
                          meta: "Recipient Address: " + TransactionDetails.to,
                          description: 'Amount: ' + TransactionDetails.value + " wei " + TransactionDetails.tokenSymbol,      
                          fluid: true,
                          style: { overflowWrap: 'break-word' }
                      };
                  }
              }
              this.setState({
                  items
              }, () => {
                  if(this.state.items.length == 0){
                      this.setState({
                          waitMessage: "You have not made any transaction yet."
                      });
                  }
              });
            } else {
                console.log(res);
                alert("Error");
            }
        })
        .catch(err => {
            console.log(err);
            alert("Catch");
        })
    }

    // async componentDidMount(){
    //     let transactionIdsOfBiconomy;
    //     const accounts = await web3.eth.getAccounts();
    //     var walletAddress = '0xD16AdDBF04Bd39DC2Cb7F87942F904D4a7B8281B'; // spender address kovan
    //     const contractInstance = getWalletContractInstance(web3, walletAddress);
    //     const biconomyAddress = await contractInstance.methods.getBiconomyAddress(accounts[0]).call();
    
    //     if(biconomyAddress != "0x0000000000000000000000000000000000000000" || biconomyAddress != "") {
    //         transactionIdsOfBiconomy = await contractInstance.methods.getTransactionsIdsByAddress(biconomyAddress).call();
    //     }

    //     var items = [];
    //     if(transactionIdsOfBiconomy.length > 0) {
    //         for(var j=0;j<transactionIdsOfBiconomy.length;j++) {
    //             const TransactionDetails = await contractInstance.methods.getTransactionDetailsById(transactionIdsOfBiconomy[j]).call();
    //             console.log(TransactionDetails);
    //             var hashLink = "https://kovan.etherscan.io/tx/"+TransactionDetails[4];
    //             items[j] =  {
    //                 header: (<a href={hashLink}>Transaction Hash: {TransactionDetails[4]}</a>),
    //                 meta: "Recipient Address: " + TransactionDetails[1],
    //                 description: 'Amount: ' + TransactionDetails[2],                
    //                 fluid: true,
    //                 style: { overflowWrap: 'break-word' }
    //             };
    //         }
    //     }
    //     this.setState({
    //         items
    //     }, () => {
    //         if(this.state.items.length == 0){
    //             this.setState({
    //                 waitMessage: "You have not made any transaction yet."
    //             });
    //         }
    //     });
    // }

    renderTransactionHistory() {
        if(this.state.items.length == 0){
            return (
                <Message floating style={{margin: '200px auto',  display: "block", width: "auto", textalign:'center'}}>
                    {this.state.waitMessage}
                </Message>
            );
        } else {
            return <Card.Group items={this.state.items}/>;
        }
    }

    render() {
        return (
            <Layout>
                <Container>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                            <Message>
                                <Message.Header>Transaction History within Instcryp</Message.Header>
                            </Message> 
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row textAlign="center">
                            <Grid.Column>
                                {this.renderTransactionHistory()}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                </Container>
            </Layout>
        );
    }
}

export default TransactionHistory; 