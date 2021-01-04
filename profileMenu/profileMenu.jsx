// In Navbar 
<>
<ShoppingCart />
<Dropdown
overlay={menu}
placement="bottomRight"
// onVisibleChange={(visible) => visible && fetchUser()}
>
<a role="button">
  <Avatar size="large" src={ava} /> <Icon type="down" />
</a>
</Dropdown>


const menu = (
  <Menu style={{ padding: '1.4em 1.2em', width: mobile ? '100%' : 280 }}>
    <Menu.Item key="hi" disabled>
      <ProfileHeading content={<Trans>Hi, {userData.firstName || userData.roleName}</Trans>} />
    </Menu.Item>
    <Menu.Item key="balance">
      {/* <ProfileHeading content={`${currency} ${formatCurrency(userData.balance)}`} /> */}
      <Button type="ghost" block>
        <DynamicIcon type="icon-dollar" /> {`${currency} ${formatCurrency(userData.balance)}`}
      </Button>
    </Menu.Item>
    {(detailsFromStorage.role || {}).code === 'TTR0' && (
      <Menu.Item key="completion" onClick={handleOpenCompletionDrawer}>
        <ProfileComplete gutter={32} type="flex" align="middle">
          <Col lg={6}>
            <Percentage type="circle" percent={percent} width={50} />
          </Col>{' '}
          <Col lg={18}>
            <Heading
              content={percent === 100 ? <Trans>You've made it!</Trans> : <Trans>You're almost there</Trans>}
              subheader={percent === 100 ? <Trans>Your profile is complete</Trans> : <Trans>Complete your profile</Trans>}
              level={4}
              marginBottom="0"
            />
          </Col>
        </ProfileComplete>
      </Menu.Item>
    )}
    {(detailsFromStorage.role || {}).code === 'TTR0' && (
      <Menu.Item key="profile">
        <Link to={`/${country}/profile/me`}>
          <Trans>
            <Icon type="user" /> &nbsp; Your profile
          </Trans>
        </Link>
      </Menu.Item>
    )}

    {(detailsFromStorage.role || {}).code === 'TTR0' && (
      <Menu.Item key="cudyclass">
        <Link to={`/${country}/cudy-classes`}>
          <Trans>
            <Icon type="appstore" /> &nbsp; My Online Classes
          </Trans>
        </Link>
      </Menu.Item>
    )}

    <Menu.Item key="chats">
      <Link to={`/${country}/chats`}>
        <Trans>
          <Icon type="message" /> &nbsp; Chats
        </Trans>
      </Link>
    </Menu.Item>
    {(detailsFromStorage.role || {}).code === 'STDN' && (
      <Menu.Item key="assignments">
        <Link to={`/${country}/assignments`}>
          <Trans>
            <Icon type="project" /> &nbsp; Your assignments
          </Trans>
        </Link>
      </Menu.Item>
    )}
    <Menu.Item key="settings">
      <Link to={`/${country}/profile/settings`}>
        <Trans>
          <Icon type="setting" /> &nbsp; Settings
        </Trans>
      </Link>
    </Menu.Item>
    <Menu.Item
      key="updates"
      onClick={() => {
        window.location.href = 'https://latest.cudy.co/feedback/';
      }}>
      <Trans>
        <Icon type="notification" /> &nbsp; Cudy updates
      </Trans>
    </Menu.Item>
    <Menu.Item key="booking-list">
      <Link to={`/${country}/booking-list`}>
        <Trans>
          <Icon type="message" /> &nbsp; Booking List
        </Trans>
      </Link>
    </Menu.Item>
    <Menu.Item key="transaction-list">
      <Link to={`/${country}/transaction-list`}>
        <Trans>
          <Icon type="message" /> &nbsp; Transaction List
        </Trans>
      </Link>
    </Menu.Item>
    <Menu.Item key="logout" onClick={() => setSignout()}>
      <Trans>Logout</Trans>
    </Menu.Item>
  </Menu>
);
</>