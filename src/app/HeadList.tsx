export default function HeadList(props) {
    return (
        <div className="headlist">
            <div className="headlist-head">
                {props.header}
            </div>
            <div className="headlist-children">
                {props.children}
            </div>
        </div>
    );    
}