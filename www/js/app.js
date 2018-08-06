var Header = React.createClass({
  switch: function (page) {
    changePage(page);
  },
  render: function () {
    return (
        <header className="bar bar-nav">
          <div className={'contents '}>
            <a onClick={this.switch.bind(this, 1)}>
              <button>Contact List</button>
            </a>
            <a onClick={this.switch.bind(this, 2)}>
              <button>Chat List</button>
            </a>
          </div>
        </header>
    );
  }
});

var PersonListItem = React.createClass({

  changeId: function (personId) {
    changePersonId(personId);
  },

  render: function () {
    return (
        <li className="table-view-cell media perons-list" onClick={this.changeId.bind(this, this.props.person.id)}>
          <img className="media-object small pull-left" src={"pics/person.svg"}/>
          {this.props.person.firstName} {this.props.person.lastName}
          <p>{this.props.person.mobilePhone}</p>
        </li>
    );
  }
});

var PersonList = React.createClass({
  getInitialState: function () {
    return {
      persons: []
    }
  },
  componentDidMount: function () {
    personService.findByName('').done(function (result) {
      this.setState({persons: result});
    }.bind(this));
  },
  render: function () {
    var items = this.state.persons.map(function (person) {
      return (
          <PersonListItem key={person.id} person={person}/>
      );
    });
    return (
        <ul className="table-view">
          {items}
        </ul>
    );
  }
});
changePage = function (page) {
  this.setState({page: page});
}
var HomePage = React.createClass({
  getInitialState: function () {
    return {page: 1};
  },
  componentDidMount: function () {
    changePage = changePage.bind(this);
  },
  render: function () {
    return (
        <div className={"page"}>
          <Header text="Contact Person" back="false"/>
          <div className="content" style={{display: this.state.page === 1 ? 'block' : 'none'}}>
            <PersonPage/>
            <PersonList/>
            <Modal/>
          </div>
          <div className="content" style={{display: this.state.page === 2 ? 'block' : 'none'}}>
            <ChatList/>
          </div>
        </div>
    );
  }
});

function changePersonId(personId) {
  personService.findById(personId).done(function (result) {
    this.setState({person: result});
  }.bind(this));
}


var PersonPage = React.createClass({
  getInitialState: function () {
    return {person: {}};
  },
  show: function (firstname, lastname, mobilePhone) {
    showModal(firstname, lastname, mobilePhone);
  },
  componentDidMount: function () {
    changePersonId = changePersonId.bind(this)
  },
  render: function () {
    return (
        <div className={"page"}>
          <div className="card">
            <ul className="table-view">
              <li className="table-view-cell media">
                <img className="media-object big pull-left" src={"pics/person.svg"}/>
                <h1>{this.state.person.firstName} {this.state.person.lastName}</h1>
              </li>
              <li className="table-view-cell flex media">
                <div className="media-body">
                  Phone No.
                  <p>{this.state.person.mobilePhone}</p>
                </div>
                {this.state.person.mobilePhone ?
                    <button className={'rightpull'} onClick={this.show.bind(this, this.state.person.firstName, this.state.person.lastName, this.state.person.mobilePhone)}>Send
                      Sms</button> : null}
              </li>
            </ul>
          </div>
        </div>
    );
  }
});

function showModal(firstname, lastname, mobilePhone) {
  this.setState({show: true, firstname: firstname, lastname: lastname, mobilePhone: mobilePhone, Otp: (1 + Math.random() * (999999)).toFixed(0)});
}

function hideModal(ishow) {
  this.setState({show: ishow, firstname: '', lastname: '', mobilePhone: '', Otp: (1 + Math.random() * (999999)).toFixed(0)});
}

var Modal = (React.createClass({
  getInitialState: function () {
    return {show: false, mobilePhone: '', firstname: '', lastname: '', Otp: (1 + Math.random() * (999999)).toFixed(0)};
  },

  componentDidMount: function () {
    showModal = showModal.bind(this);
    hideModal = hideModal.bind(this);
  },
  sendMessage: function () {
    chatService.sendChat({
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      mobilePhone: this.state.mobilePhone,
      sms: 'Hi, Your otp is ' + this.state.Otp
    }).done(function () {
    }.bind(this));
    hideModal(false);
    alert('SMS sent Succesfully, If you want to check you can check in Chat list.');
    updateChatList();
  },
  render: function () {
    return (
        <div className={this.state.show ? ' display-block' : ' display-none'}>
          {/*<span className={'modal-main-close'}></span>*/}
          <section className='modal-main'>
            <span className='modal-main-span' onClick={hideModal.bind(this, false)}>X</span>
            <textarea name="body" value={'Hi, Your otp is ' + this.state.Otp}/>
            <button onClick={this.sendMessage.bind(this)}>Send Message</button>
          </section>
        </div>
    );
  }
}));

var ChatListItem = React.createClass({
  render: function () {
    return (
        <li className="table-view-cell media perons-list">
          <img className="media-object small pull-left" src={"pics/person.svg"}/>
          {this.props.chat.firstName} {this.props.chat.lastName}
          <p>{this.props.chat.mobilePhone}</p>
          <p>{this.props.chat.sms}</p>
        </li>
    );
  }
});
updateChatList = function () {
  chatService.findAll().done(function (result) {
    this.setState({chats: result});
  }.bind(this));
}

var ChatList = (React.createClass({
  getInitialState: function () {
    return {
      chats: []
    }
  },
  componentDidMount: function () {
    updateChatList = updateChatList.bind(this);
    updateChatList();
  },
  render: function () {
    var items = this.state.chats.map(function (chat) {
      return (
          <div>
            <ChatListItem key={chat.id} chat={chat}/>
          </div>
      );
    });
    return (
        <ul className="table-view chat">{items}
        </ul>
    );
  }
}));

var App = React.createClass({
  render: function () {
    return (
        <div className="pageslider-container">
          <HomePage/>
        </div>
    );
  }
});

React.render(<App/>, document.body);