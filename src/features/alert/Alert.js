import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "./alertSlice";

export default function Alert() {
    const alerts = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    return (
        <div className="alert-wrapper">
            {alerts.map((alert, index) => {
                return (
                    <div
                        key={alert.id + ""}
                        className={`alert alert-${alert.alertType} d-flex justify-content-between`}
                    >
                        {alert.msg}
                        <span
                            onClick={() => {
                                dispatch(removeAlert(alert.id));
                            }}
                        >
                            <i class="far fa-trash-alt"></i>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
