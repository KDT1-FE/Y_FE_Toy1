import React from 'react';
import PropTypes from 'prop-types';
import { DropdownContainer, DropdownMenu } from './style';

interface DropdownProps {
    isOpen: boolean;
    closeDropDown: () => void;
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, closeDropDown, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <DropdownContainer>
            <DropdownMenu onClick={(e) => e.stopPropagation()}>{children}</DropdownMenu>
        </DropdownContainer>
    );
};

Dropdown.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeDropDown: PropTypes.func.isRequired,
};

export default Dropdown;
