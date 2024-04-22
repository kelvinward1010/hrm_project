import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Navbar from './navbar/Navbar';
import { Breadcrumb, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { addemployeeUrl, employeeUrl, settingsUrl } from '@/routes/urls';

export function Layout() {

    const { t } = useTranslation();
    const [opened, { toggle }] = useDisclosure();
    const location = useLocation();

    const breadcrumbNameMap: Record<string, string> = {
        [employeeUrl]: t("breadcrumbName.employeeUrl"),
        [addemployeeUrl]: t("breadcrumbName.addemployeeUrl"),
        [settingsUrl]: t("breadcrumbName.settingsUrl"),
    }

    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            return {
                title: <Link to={url}><Typography.Text>{breadcrumbNameMap[url]}</Typography.Text></Link>,
        };
    });

    const configBreadcrumItems = [
        {
            title: <Typography.Text>{t("nav.lable_main")}</Typography.Text>
        },
        ...breadcrumbItems
    ]

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
                <Breadcrumb items={configBreadcrumItems}/>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}