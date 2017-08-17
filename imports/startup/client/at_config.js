import { createKeystore } from '/imports/lib/ethereum/wallet.js';
import { showSeed } from '/imports/ui/components/modals/showSeed.js';


var pass;
const mySubmitFunc = function (error, state) {
  // only create seed when the signup is seccessful
  if (state === 'signUp') {
    Session.set('wallet-state', 'generating');
    createKeystore(pass, undefined, function () {
      Session.set('wallet-state', '');
      showSeed();
    });
  }
};

const myPreSignupFunc = function (password) {
  pass = password;
};


AccountsTemplates.avoidRedirect = true;

// Options for accounts
// https://github.com/meteor-useraccounts/core/blob/master/Guide.md#configuration-api
AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: false,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  // homeRoutePath: '/account',
  redirectTimeout: 4000,

  // Hookups
  // onLogoutHook: myLogoutFunc,
  onSubmitHook: mySubmitFunc,
  preSignUpHook: myPreSignupFunc,
  // postSignUpHook: myPostSignUpHook,

  // Texts
  texts: {
    button: {
      signUp: 'Create your account',
    },
    // socialSignUp: "Register...",
    socialIcons: {
      'meteor-developer': 'fa fa-rocket',
    },
    title: {
      forgotPwd: 'Recover Your Password',
      signUp: 'Sign Up',
    },
  },
});


function addNameFieldToRegistrationForm() {
  const email = AccountsTemplates.removeField('email');
  const pwd = AccountsTemplates.removeField('password');

  AccountsTemplates.addField(
    {
      _id: 'name',
      displayName: 'Your name',
      type: 'text',
      // placeholder: {
      //     signUp: "At least six characters"
      // },
      required: true,
      minLength: 4,
      // re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
      // errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
    },
  );

  AccountsTemplates.addField(email);
  AccountsTemplates.addField(pwd);
}

addNameFieldToRegistrationForm();

// AccountsTemplates.configureRoute('signIn', redirect="/account");
// AccountsTemplates.configureRoute('enrollAccount');
