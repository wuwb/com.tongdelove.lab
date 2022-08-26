import React from 'react';
import Image from 'next/image';

function Profile() {
    return (
        <div className="bg-white mb-4">
            <div className="bg-white p-4">
                <div>
                    <Image
                        src="http://iph.href.lu/48x48?text=ezreal"
                        alt="profile"
                        width="48"
                        height="48" />
                </div>
                <div>
                    <a href="/">ezreal</a>
                    <div>Hi，https://wuwb.me/</div>
                </div>
            </div>
            <div className="bg-white p-4">
                <div>

                </div>
                <a href="">创作新主题</a>
            </div>
            <div>
                <a href="/notifications">0条未读提醒</a>
                <div>
                    <a href="/balance">100金币</a>
                </div>
            </div>
        </div>
    );
}

export default Profile;
