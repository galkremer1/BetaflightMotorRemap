import React, { Component } from "react";
import Modal from "react-modal";
import { List, ListItemText, ListItemIcon, ListItem } from "@material-ui/core";
import logo from "../../images/kremerfpvlogo.png";
import YouYube from "../../images/youtube.svg";
import Paypal from "../../images/PayPal.png";
import Beer from "../../images/beer.png";
import LinkImg from "../../images/link.png";
import HeliNation from "../../images/helination.png";
import RotorRiot from "../../images/rotorriot.png";
import BanggoodLogo from "../../images/banggood.png";
import GearbestLogo from "../../images/gearbest.png";
import RDQ from "../../images/rdq.png";
import HobbyCool from "../../images/hobbycool.png";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

export default class SupportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAffiliatedLinks: false,
    };
  }
  render() {
    const { isModalOpen, toggleModal } = this.props;
    const { showAffiliatedLinks } = this.state;
    return (
      <Modal isOpen={isModalOpen} style={customStyles}>
        {!showAffiliatedLinks && (
          <div>
            <div>Paste the values in the CLI.</div>
            <div> Happy Flying! </div>
            <div>
              If you find this tool useful, please consider supporting me:
            </div>
            <List>
              <ListItem
                button
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/kremerFPV?sub_confirmation=1",
                    "_blank"
                  )
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={logo} />
                </ListItemIcon>
                <ListItemText primary="Subscribe To My YouTube Channel" />
                <ListItemIcon>
                  <img alt="YouTube" className="modalIcons" src={YouYube} />
                </ListItemIcon>
              </ListItem>

              <ListItem
                button
                onClick={() =>
                  window.open("https://paypal.me/galKremer", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="Beer" className="modalIcons" src={Beer} />
                </ListItemIcon>
                <ListItemText primary="Buy me a coffee (or a beer) ;-)" />
                <ListItemIcon>
                  <img alt="Paypal" className="modalIcons" src={Paypal} />
                </ListItemIcon>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.setState({ showAffiliatedLinks: true });
                }}
              >
                <ListItemIcon>
                  <img alt="Link" className="modalIcons" src={LinkImg} />
                </ListItemIcon>
                <ListItemText primary="Purchase your next products using my links" />
              </ListItem>
            </List>
          </div>
        )}
        {showAffiliatedLinks && (
          <div>
            <List>
              <ListItem
                button
                onClick={() =>
                  window.open("http://bit.ly/BG-Kremer-FPV", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={BanggoodLogo} />
                </ListItemIcon>
                <ListItemText primary="Banggood" />
              </ListItem>
              <ListItem
                button
                onClick={() => window.open("http://bit.ly/hobbycool", "_blank")}
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={HobbyCool} />
                </ListItemIcon>
                <ListItemText primary="HobbyCool" />
              </ListItem>

              <ListItem
                button
                onClick={() =>
                  window.open("http://bit.ly/Heli-Nation", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={HeliNation} />
                </ListItemIcon>
                <ListItemText primary="Heli-Nation" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  window.open("http://www.racedayquads.com?aff=26", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={RDQ} />
                </ListItemIcon>
                <ListItemText primary="RDQ" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  window.open("http://store.rotorriot.com?aff=10", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={RotorRiot} />
                </ListItemIcon>
                <ListItemText primary="RotorRiot" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  window.open("http://bit.ly/GB-Affiliate", "_blank")
                }
              >
                <ListItemIcon>
                  <img alt="logo" className="modalIcons" src={GearbestLogo} />
                </ListItemIcon>
                <ListItemText primary="Gearbest" />
              </ListItem>
            </List>
          </div>
        )}

        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            this.setState({ showAffiliatedLinks: false });
            toggleModal();
          }}
        >
          Close
        </button>
      </Modal>
    );
  }
}
