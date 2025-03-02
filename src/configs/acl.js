import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role, subject) => {
  //console.log("::::::: RULES ::::::::", role, ":::::::: SUBJECT ::::::::", subject);
  const { can, rules } = new AbilityBuilder(AppAbility)

  //console.log(role)

  if (role !== undefined) {
    role?.forEach((i) => {
      i?.permissions?.forEach((ele) => {
        can(ele.action, ele.resource)
      })
    })

    //console.log(rules)
    //can('manage', 'all')
    
  }

  //else if (role.name === "Company Admin") {
  //   role?.permissions?.forEach((ele) => {
  //     can(ele.action, ele.resource)
  //   })

  //   //can(['read'], 'acl-page')

  // } 
  else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role, subject) => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
