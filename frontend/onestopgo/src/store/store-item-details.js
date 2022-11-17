export const StoreItemDetails = ({store}) => {
    return (
        <div className="border border-1 row">
            <div className="row fs-3 fw-bold">
                {store.name}
            </div>
            <div className="row">
                {store.location}
            </div>
            <div className="row">
                {store.type}
            </div>
            <div className="row">
                <ul>
                    {store.storeAdmins.map((each) => <li>{each.email}</li>)}
                </ul>
            </div>
        </div>
    );
}