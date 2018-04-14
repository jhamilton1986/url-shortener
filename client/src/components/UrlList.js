import React from 'react';
import PropTypes from 'prop-types';
import UrlListItem from './UrlListItem';
import { Table } from 'reactstrap';

function UrlList(props) {
    return (
        <Table className="URLList">
            <thead>
                <tr>
                    <th>Original URL</th>
                    <th>Shortened URL</th>
                    <th>Hit Counter</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.urls.map(url =>
                    <UrlListItem key={url._id} urlData={url} onDelete={() => {props.deleteHandler()}} />
                )}
            </tbody>
        </Table>
    );
}

UrlList.propTypes = {
    urls: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        originalUrl: PropTypes.string.isRequired,
        redirectUrl: PropTypes.string.isRequired,
        hitCounter: PropTypes.number.isRequired,
    })).isRequired,
    deleteHandler: PropTypes.func.isRequired
};

export default UrlList;