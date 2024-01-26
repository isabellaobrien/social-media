import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../../styles/Comment.module.css'

function ProfileEditDropdown(props) {
    const {id} = props;
    const history = useHistory();
  return (
    <Dropdown drop="up">
        <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit`)}
                aria-label="edit-profile">
                edit profile picture
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/username`)}
                aria-label="edit-username">
                edit username
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/password`)}
                aria-label="edit-password">
                change password
            </Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileEditDropdown