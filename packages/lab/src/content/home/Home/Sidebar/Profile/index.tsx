import React from 'react';
import Image from 'next/image';
import { Link } from '@/components/ui';

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
                    <Link href="/">ezreal</Link>
                    <div>Hi，https://wuwb.me/</div>
                </div>
            </div>
            <div className="bg-white p-4">
                <div>

                </div>
                <Link href="">创作新主题</Link>
            </div>
            <div>
                <Link href="/notifications">0条未读提醒</Link>
                <div>
                    <Link href="/balance">100金币</Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
