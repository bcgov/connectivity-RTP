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
	  form_data ->> 'contactEmail' as contact_email,
    form_data ->> 'city' as city,
	  form_data ->> 'poBox' as po_box,
	  form_data ->> 'postalCode' as postal_code,
	  form_data ->> 'streetName' as street_name,
	  form_data ->> 'unitNumber' as unit_number,
	  form_data ->> 'streetNumber' as street_number,
	  form_data ->> 'primaryContact' as primary_contact,
	  form_data ->> 'zoneInformation' as zone_information,
		form_data ->> 'zoneFeedback' as zone_feedback,
	  form_data ->> 'organizationName' as organization_name,
	  form_data ->> 'organizationType' as organization_type,
	  form_data ->> 'registrationNumber' as registration_number,
	  form_data ->> 'fixedWireless' as fixed_wireless,
	  form_data ->> 'wiredBroadband' as wired_broadband,
	  form_data ->> 'pendingProjects' as pending_projects,
	  form_data ->> 'underservedAreas' as underserved_areas,
	  form_data ->> 'satelliteProposal' as satellite_proposal,
		form_data ->> 'backboneGaps' as backbone_gaps,
	  form_data ->> 'newBackboneTechnology' as newBackbone_technology,
		form_data ->> 'multipleBackboneDetails' as multiple_backbone_details,
	  form_data ->> 'govtIndigenousConnFocus' as govt_indigenous_conn_focus,
		form_data ->> 'capitalCostFunding' as capital_cost_funding,
	  form_data ->> 'capitalCostExplanation' as capital_cost_explanation,
	  form_data ->> 'highwayCellularGeomark' as highway_cellular_geomark,
	  form_data ->> 'lastMileBroadbandGeomark' as last_mile_broadband_geomark,
	  form_data ->> 'lastMileNewBackboneGeomark' as last_mile_new_backbone_geomark
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
comment on column connectivity_intake_public.form.contact_email is 'The contact email for the primary contact';
comment on column connectivity_intake_public.form.city is 'The city of the organization';
comment on column connectivity_intake_public.form.po_box is 'The PO box of the organiztion';
comment on column connectivity_intake_public.form.postal_code is 'The postal code of the organization';
comment on column connectivity_intake_public.form.street_name is 'The street name of the organization';
comment on column connectivity_intake_public.form.unit_number is 'The unit number (address) of the organization';
comment on column connectivity_intake_public.form.primary_contact is 'The name of the primary contact of the organization ';
comment on column connectivity_intake_public.form.zone_information is 'The ist of the zones that information is being provides for';
comment on column connectivity_intake_public.form.zone_feedback is 'The feedback on the proposed zone boundaries';
comment on column connectivity_intake_public.form.organization_name is 'The name of the organization';
comment on column connectivity_intake_public.form.organization_type is 'The type of organization eg. Service provider/Government/First Nation';
comment on column connectivity_intake_public.form.registration_number is 'The business registration number';
comment on column connectivity_intake_public.form.fixed_wireless is 'The amount of underserved households that could be reached by fixed wireless';
comment on column connectivity_intake_public.form.wired_broadband is 'The amount of underserved households that could be reached by wired broadband';
comment on column connectivity_intake_public.form.pending_projects is 'Additional information on pending projects';
comment on column connectivity_intake_public.form.underserved_areas is 'Additional information on underserved areas';
comment on column connectivity_intake_public.form.satellite_proposal is 'Additional information on satellite proposals';
comment on column connectivity_intake_public.form.backbone_gaps is 'The details for addressing gaps in backbone infrastructure needed to reach underserved households';
comment on column connectivity_intake_public.form.newBackbone_technology is 'The list of new backbone technology needed to be built';
comment on column connectivity_intake_public.form.multiple_backbone_details is 'The high level description for how multiple backbone technologies would be implemented';
comment on column connectivity_intake_public.form.govt_indigenous_conn_focus is 'Additional feedback for local govenmentss and First Nations';
comment on column connectivity_intake_public.form.capital_cost_funding is 'Additional information on capital costs funding for highway cellular';
comment on column connectivity_intake_public.form.capital_cost_explanation is 'The explanation of why the capital costs section of the highway cellular KMZ file was chosen ';
comment on column connectivity_intake_public.form.highway_cellular_geomark is 'The  highway cellular Geomark link';
comment on column connectivity_intake_public.form.last_mile_broadband_geomark is 'The wired broadband last mile Geomark link';
comment on column connectivity_intake_public.form.last_mile_new_backbone_geomark is 'The new backbone technology for last mile Geomark link';


commit;
