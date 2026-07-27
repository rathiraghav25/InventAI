import React from "react";

interface Props {
    status: string;
}

const StatusBadge: React.FC<Props> = ({ status }) => {

    let className = "badge badge-info";

    if (status === "Completed")
        className = "badge badge-success";

    else if (status === "Pending")
        className = "badge badge-warning";

    return (
        <span className={className}>
            {status}
        </span>
    );
};

export default StatusBadge;