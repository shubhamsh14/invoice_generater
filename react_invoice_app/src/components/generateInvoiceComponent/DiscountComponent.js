import React from 'react';

class DiscountAmount extends React.Component {
  render() {
    const { discount, price, quantity } = this.props;

    // Calculate the discount amount
    const discountAmount = (price * quantity * (discount / 100)).toFixed(2);

    return (
      <div>
        <span>{discountAmount}</span>
      </div>
    );
  }
}

export default DiscountAmount;

class GSTAmount extends React.Component {
    render() {
      const { discount, price, quantity } = this.props;
  
      // Calculate the discount amount
      const discountAmount = (price * quantity * (discount / 100)).toFixed(2);
  
      return (
        <div>
          <span>{discountAmount}</span>
        </div>
      );
    }
  }
  
export {GSTAmount};
