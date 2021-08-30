import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserAlbum } from "../../actions/albumsActions";
import { PhotoListView } from "../../components/photolist/PhotoListView";
import { Photoset } from "../../reducers/photosReducer";

export class AlbumUserGallery extends Component {
  isLoaded() {
    return (
      this.props.fetchedPhotoset === Photoset.USER_ALBUM &&
      this.props.albumDetails.id === this.props.match.params.albumID
    );
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.dispatch(fetchUserAlbum(this.props.match.params.albumID));
    }
  }

  render() {
    const isPublic =
      this.props.albumDetails.owner &&
      this.props.albumDetails.owner.id !== this.props.auth.access.user_id;
    const additionalSubHeader = "";
    if (isPublic) {
      additionalSubHeader = (
        <span>
          {", "}owned by{" "}
          <b style={{ color: "black" }}>
            {this.props.albumDetails.owner.id === this.props.auth.access.user_id
              ? "you"
              : this.props.albumDetails.owner.username}
          </b>
        </span>
      );
    }
    return (
      <PhotoListView
        title={
          this.props.albumDetails
            ? this.props.albumDetails.title
            : "Loading... "
        }
        additionalSubHeader={additionalSubHeader}
        loading={!this.isLoaded()}
        titleIconName={"bookmark"}
        isDateView={true}
        photosGroupedByDate={this.props.photosGroupedByDate}
        idx2hash={this.props.photosFlat}
        match={this.props.match}
        isPublic={isPublic}
      />
    );
  }
}

AlbumUserGallery = connect((store) => {
  return {
    auth: store.auth,
    albumDetails: store.albums.albumDetails,
    photosGroupedByDate: store.photos.photosGroupedByDate,
    photosFlat: store.photos.photosFlat,
    fetchedPhotoset: store.photos.fetchedPhotoset,
  };
})(AlbumUserGallery);