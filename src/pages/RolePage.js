import React from 'react';
import axios from 'axios';


class RolePage extends React.Component {
  state = { role: null, roleId: this.props.match.params.id };

  getRole = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/role/${this.state.roleId}`
    );
    this.setState({ role: data[0] });
  };

  handleDeleteClick = () => {
    axios.delete(`http://localhost:3001/employee/${this.state.roleId}`)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.history.push("/roles");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  componentDidMount() {
    this.getRole();
  }

  render() {
    console.log(this.state)
    return <div>Role Page</div>
  }
}

export default RolePage;