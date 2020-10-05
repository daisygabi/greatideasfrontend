import React, {Component} from 'react';

class ItemArray extends Component {

	render() {

		return (
			<div className="col-12">
				{this.props.ideas.length > 0 ? this.props.ideas.map(item => {
					return <div className="post-block mr-md-3 mb-2 flex-column" key={item.id}>
						<div><img src={this.showImage(item.image)} alt="" className="w-100 post-block--img"/></div>
						<div className="pl-2 pr-2 pt-2"><p className="font-weight-bold">{item.name}</p></div>
						<div className="row p-2">
							<div
								className="col-6 d-flex align-items-center justify-content-start">{item.ownerName}</div>
							<div className="col-6 d-flex align-items-center justify-content-end">
								<img src={require('../../img/heart.svg')} alt="total number of likes"
									 className="small-icon pr-1"/>
								{item.likes} 💬 {item.comments}</div>
						</div>
					</div>
				}) : "No data found"}
			</div>
		);
	}

	showImage(imageUrl) {
		if(imageUrl === null) {
			return `https://images.unsplash.com/photo-1569063386798-345908ef9a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`
		}
		return imageUrl;
	}
}

export default ItemArray;
