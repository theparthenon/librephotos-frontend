import { ActionIcon, Group, Loader } from "@mantine/core";
import {
  IconEye as Eye,
  IconEyeOff as EyeOff,
  IconInfoCircle as InfoCircle,
  IconPlayerPause as PlayerPause,
  IconPlayerPlay as PlayerPlay,
  IconStar as Star,
} from "@tabler/icons-react";
import React from "react";

import { useSetFavoritePhotosMutation } from "../../api_client/photos/favorite";
import { useSetPhotosHiddenMutation, useSetPhotosPublicMutation } from "../../api_client/photos/visibility";
import { playerActions } from "../../store/player/playerSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

type Props = Readonly<{
  photosDetail: any;
  isPublic: boolean;
  lightboxSidebarShow: boolean;
  closeSidepanel: () => void;
}>;

export function Toolbar(props: Props) {
  const dispatch = useAppDispatch();
  const { favorite_min_rating: favoriteMinRating } = useAppSelector(store => store.user.userSelfDetails);
  const { photosDetail, isPublic, lightboxSidebarShow, closeSidepanel } = props;
  const { playing: playerPlaying, loading: playerLoading } = useAppSelector(store => store.player);
  const [setPhotosHidden] = useSetPhotosHiddenMutation();
  const [setPhotosPublic] = useSetPhotosPublicMutation();
  const [setFavoritePhotos] = useSetFavoritePhotosMutation();

  function playButton(photo) {
    if (!photo || photo.embedded_media.length === 0) {
      return null;
    }
    function togglePlay() {
      if (playerPlaying) {
        dispatch(playerActions.pause());
      } else {
        dispatch(playerActions.play());
      }
    }
    return (
      <ActionIcon onClick={() => togglePlay()}>
        {playerLoading && <Loader color="grey" />}
        {!playerLoading && playerPlaying ? <PlayerPause color="grey" /> : <PlayerPlay color="grey" />}
      </ActionIcon>
    );
  }

  return (
    <Group style={{ paddingBottom: 10, paddingRight: 5 }}>
      {!photosDetail && !isPublic && (
        <ActionIcon loading>
          <Eye color="grey" />
        </ActionIcon>
      )}
      {!photosDetail && !isPublic && (
        <ActionIcon loading>
          <Star color="grey" />
        </ActionIcon>
      )}
      {playButton(photosDetail)}
      {photosDetail && !isPublic && (
        <ActionIcon
          onClick={() => {
            const { image_hash: imageHash } = photosDetail;
            const val = !photosDetail.hidden;
            setPhotosHidden({ image_hashes: [imageHash], hidden: val });
          }}
        >
          {photosDetail.hidden ? <EyeOff color="red" /> : <Eye color="grey" />}
        </ActionIcon>
      )}
      {photosDetail && !isPublic && (
        <ActionIcon
          onClick={() => {
            const { image_hash: imageHash } = photosDetail;
            const val = !(photosDetail.rating >= favoriteMinRating);
            setFavoritePhotos({ image_hashes: [imageHash], favorite: val });
          }}
        >
          <Star color={photosDetail.rating >= favoriteMinRating ? "yellow" : "grey"} />
        </ActionIcon>
      )}
      <ActionIcon onClick={() => closeSidepanel()}>
        <InfoCircle color={lightboxSidebarShow ? "white" : "grey"} />
      </ActionIcon>
    </Group>
  );
}
