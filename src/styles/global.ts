import { StyleSheet } from 'react-native';

export const colors = {
  background: '#131512',
  surface: '#1F221B',
  surfaceRaised: '#262A21',
  border: '#343A2E',
  primary: '#7E8B63',
  secondary: '#9FAC82',
  text: '#E6E8E2',
  textSecondary: '#a0a0b0',
  silver: '#C5C9C0',
  alert: '#ff5252',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appShell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  sidebar: {
    width: 76,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 18,
    alignItems: 'center',
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    overflow: 'hidden',
  },
  logoImage: {
    width: 54,
    height: 54,
  },
  logoText: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '800',
  },
  nav: {
    width: '100%',
    alignItems: 'center',
  },
  navItem: {
    width: 52,
    height: 58,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  navItemActive: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  navItemPressed: {
    opacity: 0.72,
  },
  navSeparator: {
    width: 32,
    height: 1,
    alignSelf: 'center',
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  navIndicator: {
    width: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginBottom: 10,
    alignSelf: 'center',
  },
  navIndicatorOff: {
    opacity: 0.11,
  },
  navLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  navLabelActive: {
    color: colors.text,
  },
  mainArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topbar: {
    height: 40,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  topbarTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  navbarStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  navbarStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navbarStatusText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 28,
  },
  contentTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  contentText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
