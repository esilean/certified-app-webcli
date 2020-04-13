import React from 'react'
import { toast } from 'react-toastify';
import { css } from 'glamor';

import CloseButton from './closeButton'

export default {
    // Keep the signature of the original toast object
    // Doing so you can pass additionnal options
    success(msg, options = {}) {
        return toast.success(msg, {
            // Merge additionals options
            ...options,
            className: css({
                padding: 20,
                color: 'rgb(0, 102, 68)',
                minHeight: '60px',
                borderRadius: '4px',
                backgroundColor: 'rgb(227, 252, 239)',
                boxShadow: 'rgba(0, 0, 0, 0.176) 0px 3px 8px'
            }),
            progressClassName: css({
                background: 'rgb(54, 179, 126)',
                height: 4
            }),
            autoClose: 2000,
            closeButton: <CloseButton color='rgb(0, 102, 68)' />,
        });
    },

    warn(msg, options = {}) {
        return toast.success(msg, {
            // Merge additionals options
            ...options,
            className: css({
                padding: 20,
                color: 'rgb(255, 139, 0)',
                minHeight: '60px',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 250, 230)',
                boxShadow: 'rgba(0, 0, 0, 0.176) 0px 3px 8px'
            }),
            progressClassName: css({
                background: 'rgb(255, 171, 0)',
                height: 4
            }),
            closeButton: <CloseButton color='rgb(255, 139, 0)' />,
        });
    },

    info(msg, options = {}) {
        return toast.success(msg, {
            // Merge additionals options
            ...options,
            className: css({
                padding: 20,
                color: 'rgb(80, 95, 121)',
                minHeight: '60px',
                borderRadius: '4px',
                backgroundColor: 'white',
                boxShadow: 'rgba(0, 0, 0, 0.176) 0px 3px 8px'
            }),
            progressClassName: css({
                background: 'rgb(38, 132, 255)',
                height: 4
            }),
            closeButton: <CloseButton color='rgb(80, 95, 121)' />,
        });
    },

    error(msg, options = {}) {
        return toast.error(msg, {
            // Merge additionals options
            ...options,
            className: css({
                padding: 20,
                color: 'rgb(191, 38, 0)',
                minHeight: '60px',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 235, 230)',
                boxShadow: 'rgba(0, 0, 0, 0.176) 0px 3px 8px'
            }),
            progressClassName: css({
                background: 'rgb(255, 86, 48)',
                height: 4
            }),
            autoClose: 4000,
            closeButton: <CloseButton color='rgb(191, 38, 0)' />,
        });
    }
}
