import React, {Component} from 'react';
import './Steps.css';
import $ from 'jquery';

class Steps extends Component {

  render() {
    
    return <div className="steps_wrapper">

      <div className="steps_center">

        <div className="step_number" onClick={this.props.onClick1}>
          <p style={{color: this.props.numberColor, borderColor: this.props.borderNumberColor}} className="number">{this.props.number}</p>
          <p className="description">{this.props.description}</p>
        </div>

        {this.props.bar == "1" ?
        <hr style={{borderColor: this.props.borderColorBar}} className="bar" />
        :
        <div></div>
        }

      </div>
    </div>;
  }
}

export default Steps;