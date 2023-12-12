import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function PageHeader({pageName}) {
    return (
        <Row className>
            <Card className="p-2 p-xl-1 my-1 my-xl-1 " style={{ height: '65px', backgroundColor: '#d7e6f5', alignItems: 'left' }}>
                <div className="d-block fw-bold" style={{ blockSize: '15%', fontSize: 28, width: '100%', color: 'black' }}> {pageName} </div>
            </Card>
        </Row>)
}

export default PageHeader;