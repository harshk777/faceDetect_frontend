import React from "react";
class register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
            name: ''
        }
    }
    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }
    onPassChange = (event) =>{
        this.setState({pass: event.target.value})
    }

    onSubmitSignin = () => {
        // console.log(this.state);
        fetch('https://whispering-woodland-28994.herokuapp.com/register',{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body:JSON.stringify({
                email: this.state.email,
                pass: this.state.pass,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loaadUser(user)
                this.props.onRouteChange('home');

            }
        })   
     }

    render() {
        // const { onRouteChange } = this.props;
        return  (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input 
                            onChange={this.onNameChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                             onChange={this.onEmailChange}
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPassChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                        onClick={this.onSubmitSignin}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                        />
                        </div>
                    </div>
                </main>    
            </article>
        );
    }  
}

export default register;         
