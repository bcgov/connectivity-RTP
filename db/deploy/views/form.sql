-- Deploy connectivity-intake:views/form to pg
-- requires: tables/applications

begin;
	drop view if exists connectivity_intake_public.form;
  create or replace view connectivity_intake_public.form as (
    with form_data as (
      select
		id,
		reference_number,
		owner,
		status,
		created_by,
		created_at,
		updated_by,
		updated_at,
		archived_by,
		archived_at,
    form_data
      from connectivity_intake_public.applications
    )
    select
		id,
		reference_number,
		owner,
		status,
		created_by,
		created_at,
		updated_by,
		updated_at,
		archived_by,
		archived_at,
	  form_data ->> 'position' as position,
	  form_data ->> 'extention' as extention,
	  form_data ->> 'telephone' as telephone,
	  form_data ->> 'contactEmail' as contactEmail,
    form_data ->> 'city' as city,
	  form_data ->> 'poBox' as poBox,
	  form_data ->> 'postalCode' as postalCode,
	  form_data ->> 'streetName' as streetName,
	  form_data ->> 'unitNumber' as unitNumber,
	  form_data ->> 'streetNumber' as streetNumber,
	  form_data ->> 'primaryContact' as primaryContact,
	  form_data ->> 'zoneInformation' as zoneInformation,
		form_data ->> 'zoneFeedback' as zoneFeedback,
	  form_data ->> 'organizationName' as organizationName,
	  form_data ->> 'organizationType' as organizationType,
	  form_data ->> 'registrationNumber' as registrationNumber,
	  form_data ->> 'fixedWireless' as fixedWireless,
	  form_data ->> 'wiredBroadband' as wiredBroadband,
	  form_data ->> 'pendingProjects' as pendingProjects,
	  form_data ->> 'underservedAreas' as underservedAreas,
	  form_data ->> 'satelliteProposal' as satelliteProposal,
		form_data ->> 'backboneGaps' as backboneGaps,
	  form_data ->> 'newBackboneTechnology' as newBackboneTechnology,
		form_data ->> 'multipleBackboneDetails' as multipleBackboneDetails,
	  form_data ->> 'govtIndigenousConnFocus' as govtIndigenousConnFocus,
		form_data ->> 'capitalCostFunding' as capitalCostFunding,
	  form_data ->> 'capitalCostExplanation' as capitalCostExplanation,
	  form_data ->> 'highwayCellularGeomark' as highwayCellularGeomark,
	  form_data ->> 'lastMileBroadbandGeomark' as lastMileBroadbandGeomark,
	  form_data ->> 'lastMileNewBackboneGeomark' as lastMileNewBackboneGeomark
	  from form_data
 );


comment on view connectivity_intake_public.form is E'@omit\nThe view for tabular intake form data';
comment on column connectivity_intake_public.form.id is 'The application id';
comment on column connectivity_intake_public.form.reference_number is 'The application reference number';
comment on column connectivity_intake_public.form.created_by is 'The token for the user that created the form';
comment on column connectivity_intake_public.form.created_at is 'The timestamp for when the form was created';
comment on column connectivity_intake_public.form.updated_by is 'The token for the user that updated the form';
comment on column connectivity_intake_public.form.updated_at is 'The timestamp for when the form was updated';
comment on column connectivity_intake_public.form.archived_by is 'The token for the user that archived the form';
comment on column connectivity_intake_public.form.archived_at is 'The timestamp for when the form was archived';
comment on column connectivity_intake_public.form.position is 'The job position of the applicant';
comment on column connectivity_intake_public.form.extention is 'The telephone extention';
comment on column connectivity_intake_public.form.telephone is 'The telephone number of the primary contact';
comment on column connectivity_intake_public.form.contactEmail is 'The contact email for the primary contact';
comment on column connectivity_intake_public.form.city is 'The city of the organization';
comment on column connectivity_intake_public.form.poBox is 'The PO box of the organiztion';
comment on column connectivity_intake_public.form.postalCode is 'The postal code of the organization';
comment on column connectivity_intake_public.form.streetName is 'The street name of the organization';
comment on column connectivity_intake_public.form.unitNumber is 'The unit number (address) of the organization';
comment on column connectivity_intake_public.form.primaryContact is 'The name of the primary contact of the organization ';
comment on column connectivity_intake_public.form.zoneInformation is 'The ist of the zones that information is being provides for';
comment on column connectivity_intake_public.form.zoneFeedback is 'The feedback on the proposed zone boundaries';
comment on column connectivity_intake_public.form.organizationName is 'The name of the organization';
comment on column connectivity_intake_public.form.organizationType is 'The type of organization eg. Service provider/Government/First Nation';
comment on column connectivity_intake_public.form.registrationNumber is 'The business registration number';
comment on column connectivity_intake_public.form.fixedWireless is 'The amount of underserved households that could be reached by fixed wireless';
comment on column connectivity_intake_public.form.wiredBroadband is 'The amount of underserved households that could be reached by wired broadband';
comment on column connectivity_intake_public.form.pendingProjects is 'Additional information on pending projects';
comment on column connectivity_intake_public.form.underservedAreas is 'Additional information on underserved areas';
comment on column connectivity_intake_public.form.satelliteProposal is 'Additional information on satellite proposals';
comment on column connectivity_intake_public.form.backboneGaps is 'The details for addressing gaps in backbone infrastructure needed to reach underserved households';
comment on column connectivity_intake_public.form.newBackboneTechnology is 'The list of new backbone technology needed to be built';
comment on column connectivity_intake_public.form.multipleBackboneDetails is 'The high level description for how multiple backbone technologies would be implemented';
comment on column connectivity_intake_public.form.govtIndigenousConnFocus is 'Additional feedback for local govenmentss and First Nations';
comment on column connectivity_intake_public.form.capitalCostFunding is 'Additional information on capital costs funding for highway cellular';
comment on column connectivity_intake_public.form.capitalCostExplanation is 'The explanation of why the capital costs section of the highway cellular KMZ file was chosen ';
comment on column connectivity_intake_public.form.highwayCellularGeomark is 'The  highway cellular Geomark link';
comment on column connectivity_intake_public.form.lastMileBroadbandGeomark is 'The wired broadband last mile Geomark link';
comment on column connectivity_intake_public.form.lastMileNewBackboneGeomark is 'The new backbone technology for last mile Geomark link';


commit;
