/**
 * CJS Export wrapper of variantBEngine for testing
 */
const {
  VARIANT_B_CONFIG,
  buildFirstInteractiveMessage,
  buildPersonalizedInterestResponse,
  buildWorkshopDetailsBranch,
  buildFeeAndPaymentBranch,
  buildPaymentProofReceivedBranch,
  buildPaymentApprovedBranch,
  buildHumanHandoffMessage,
  checkHumanHandoffTriggers,
  generateControlledAIResponse
} = require('./variantBEngineRaw.cjs');

module.exports = {
  VARIANT_B_CONFIG,
  buildFirstInteractiveMessage,
  buildPersonalizedInterestResponse,
  buildWorkshopDetailsBranch,
  buildFeeAndPaymentBranch,
  buildPaymentProofReceivedBranch,
  buildPaymentApprovedBranch,
  buildHumanHandoffMessage,
  checkHumanHandoffTriggers,
  generateControlledAIResponse
};
