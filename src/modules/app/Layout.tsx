import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Navbar from './navbar/Navbar';
import { breadcrumbNameMap } from '@/routes/urls';
import { Breadcrumb, Typography } from 'antd';

export function Layout() {
    const [opened, { toggle }] = useDisclosure();

    const location = useLocation();

    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            return {
                key: url,
                title: <Link to={url}><Typography.Text>{breadcrumbNameMap[url]}</Typography.Text></Link>,
        };
    });

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 250,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Header />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Typography.Text>General</Typography.Text>
                    </Breadcrumb.Item>
                    {breadcrumbItems.map((item) => (
                        <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}