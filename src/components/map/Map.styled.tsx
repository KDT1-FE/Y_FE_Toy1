import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 570px;
  margin: 0;
  padding: 0;
  position: relative;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;

  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);

  font-size: 12px;
  overflow-y: auto;
  z-index: 1;

  & hr {
    display: block;
    height: 1px;
    margin: 3px 0;

    border: 0;
    border-top: 2px solid #5f5f5f;
  }
`;

export const Option = styled.div`
  text-align: center;

  & p {
    margin: 10px 0;
  }

  & button {
    margin-left: 5px;
  }
`;

export const PlaceList = styled.li`
  list-style: none;

  & .item {
    position: relative;
    min-height: 65px;
    margin-top: 7px;

    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const Pagination = styled.div`
  margin: 10px auto;
  text-align: center;

  & a {
    display: inline-block;
    margin-right: 10px;
  }

  & .on {
    color: #777;
    font-weight: bold;
    cursor: default;
  }
`;
