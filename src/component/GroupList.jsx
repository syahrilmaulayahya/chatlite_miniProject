function GroupList(props) {
  const { group } = props;
  return (
    <>
      <div className="list-group-item list-group-item-action border-0">
        <div className="d-flex align-items-start">
          <div className="position-relative">
            <img
              src={group.picture}
              className="rounded-circle mr-1"
              alt="Username"
              width="40"
              height="40"
            />
            &nbsp;{group.name}
            {group.ownerId?<div>(Admin)</div>:<div></div>}
          </div>
        </div>
        
      </div>
      
    </>
  );
}

export default GroupList;
