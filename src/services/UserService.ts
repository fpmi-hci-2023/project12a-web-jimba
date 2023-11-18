
import { toast } from 'react-toastify';
import ToastComponent from '../components/common/toast/ToastComponent';

export class UserService {
    static isAuthenticated(): boolean {
        return window.localStorage.getItem('token') !== null
    }

    static getPayload(): any {
        const token = localStorage.getItem('token')

        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload;
            }
        }
    }

    static getUsername(): string | undefined {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['sub'];
            }
        }
    }

    static getUserId(): string | undefined {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['id'];
            }
        }
    }

    static getRole(): string | undefined {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['role'];
            }
        }
    }

    static getProfilePicUrl(): string | undefined {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['profilePicUrl'];
            }
        }
    }

    static getFirstName(): string | undefined {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['firstName'];
            }
        }
    }

    static isTheUserLoggedIn(): boolean {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload['role'];

                if (payload) {
                    if (role !== null || role !== undefined) {
                        return true;
                    }
                }
            } catch (err) {
                localStorage.clear();
                toast.error(
                    ToastComponent.errorToast({text: 'Unauthorized'}), 
                    { position: toast.POSITION.TOP_RIGHT }
                );
            }
        }
        return false;
    }

    static isRoot(): boolean {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];

            if (payload) {
                if ((role !== null || role !== undefined) && role === 'ROOT') {
                    return true;
                }
            }
        }

        return false;
    }

    static isAdmin(): boolean {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];
            if (payload) {
                if ((role !== null || role !== undefined) && (role === 'ADMIN' || role === 'ROOT')) {
                    return true;
                }
            }
        }

        return false;
    }


    static isLoggedInUser(username: string): boolean {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                const loggedInUserName = payload['sub'];
                if (username === loggedInUserName) {
                    return true;
                }
                return false;
            }
        }

        return false;
    }

    static checkIfIsRoot(role: string): boolean {
        if (role === 'ROOT') {
            return true;
        }

        return false;
    }

    static formatUsername(firstName: string = '', lastName: string = '', nameLength: number = 18): string {
        let name = firstName + ' ' + lastName;

        if (name.length >= nameLength) {
            return name.substring(0, nameLength) + '...';
        }
        return name;
    }

    static getImageSize(profilePicUrl: string): string {
        let img = new Image();
        img.src = profilePicUrl;

        if (img.width >= img.height) {
            return 'l'
        }

        return '';
    }
}